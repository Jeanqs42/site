import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    "https://ezeduibvnsbswetrjqoq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZWR1aWJ2bnNic3dldHJqcW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzMwNjMsImV4cCI6MjA3MjE0OTA2M30.kCagH0zUI7QwdcyJiPpEySiQrmuOczIBbIcvwb6lIgo"
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get plan from request body
    const { plan } = await req.json();
    if (!plan) throw new Error("Plan not specified");
    logStep("Plan requested", { plan });

    // Map plans to Stripe product IDs and prices
    const planConfig: Record<string, { productId: string; priceAmount: number; name: string }> = {
      basic: { 
        productId: "prod_Sy88pA9yIGooWC", 
        priceAmount: 1990, // R$ 19,90 in centavos
        name: "Plano Basic" 
      },
      premium: { 
        productId: "prod_Sy8J8PQlrEDIsV", 
        priceAmount: 5990, // R$ 59,90 in centavos
        name: "Plano Premium" 
      },
      unlimited: { 
        productId: "prod_Sy8PYSqgBRIirG", 
        priceAmount: 19990, // R$ 199,90 in centavos
        name: "Plano Unlimited" 
      }
    };

    const selectedPlan = planConfig[plan.toLowerCase()];
    if (!selectedPlan) throw new Error(`Invalid plan: ${plan}`);
    logStep("Plan configuration found", selectedPlan);

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("Creating new customer");
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product: selectedPlan.productId,
            unit_amount: selectedPlan.priceAmount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/dashboard?success=true`,
      cancel_url: `${req.headers.get("origin")}/planos?canceled=true`,
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});