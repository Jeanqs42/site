-- Add api_key column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN api_key TEXT;

-- Update the handle_new_user function to generate a random API key
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, api_key)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    'vexpro_' || encode(gen_random_bytes(24), 'base64')
  );
  RETURN NEW;
END;
$$;