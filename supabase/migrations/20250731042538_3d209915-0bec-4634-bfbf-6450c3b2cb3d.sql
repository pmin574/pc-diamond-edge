-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create materials table (top level category)
CREATE TABLE public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create series table (within materials)
CREATE TABLE public.series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(material_id, name)
);

-- Create specification templates for series
CREATE TABLE public.specification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
  spec_name TEXT NOT NULL,
  spec_type TEXT NOT NULL DEFAULT 'text', -- text, number, boolean, select
  spec_options JSONB, -- for select type specifications
  is_required BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create products table (articles within series)
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series_id UUID NOT NULL REFERENCES public.series(id) ON DELETE CASCADE,
  article_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  specifications JSONB NOT NULL DEFAULT '{}',
  inventory_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed, refunded
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  product_snapshot JSONB NOT NULL, -- store product details at time of order
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create subscribers table for recurring payments
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create security definer function for checking admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.is_admin());

-- RLS Policies for materials (public read, admin write)
CREATE POLICY "Everyone can view materials" ON public.materials
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage materials" ON public.materials
  FOR ALL USING (public.is_admin());

-- RLS Policies for series (public read, admin write)
CREATE POLICY "Everyone can view series" ON public.series
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage series" ON public.series
  FOR ALL USING (public.is_admin());

-- RLS Policies for specification_templates (public read, admin write)
CREATE POLICY "Everyone can view spec templates" ON public.specification_templates
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage spec templates" ON public.specification_templates
  FOR ALL USING (public.is_admin());

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Everyone can view active products" ON public.products
  FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_admin());

-- RLS Policies for orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL USING (public.is_admin());

-- RLS Policies for order_items
CREATE POLICY "Users can view own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Admins can manage order items" ON public.order_items
  FOR ALL USING (public.is_admin());

-- RLS Policies for subscribers
CREATE POLICY "Users can view own subscription" ON public.subscribers
  FOR SELECT USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Service can update subscriptions" ON public.subscribers
  FOR ALL USING (true);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON public.materials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_series_updated_at
  BEFORE UPDATE ON public.series
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample data
INSERT INTO public.materials (name, description) VALUES 
  ('Steel', 'High-quality steel cutting tools'),
  ('Aluminum', 'Precision aluminum cutting tools'),
  ('Titanium', 'Premium titanium cutting tools');

INSERT INTO public.series (material_id, name, description) VALUES 
  ((SELECT id FROM public.materials WHERE name = 'Steel'), 'Heavy Duty Series', 'Industrial strength steel cutting tools'),
  ((SELECT id FROM public.materials WHERE name = 'Steel'), 'Precision Series', 'High precision steel cutting tools'),
  ((SELECT id FROM public.materials WHERE name = 'Aluminum'), 'Lightweight Series', 'Lightweight aluminum cutting tools');

-- Insert specification templates
INSERT INTO public.specification_templates (series_id, spec_name, spec_type, is_required, display_order) VALUES 
  ((SELECT id FROM public.series WHERE name = 'Heavy Duty Series'), 'Diameter', 'number', true, 1),
  ((SELECT id FROM public.series WHERE name = 'Heavy Duty Series'), 'Length', 'number', true, 2),
  ((SELECT id FROM public.series WHERE name = 'Heavy Duty Series'), 'Coating', 'select', false, 3),
  ((SELECT id FROM public.series WHERE name = 'Precision Series'), 'Diameter', 'number', true, 1),
  ((SELECT id FROM public.series WHERE name = 'Precision Series'), 'Length', 'number', true, 2),
  ((SELECT id FROM public.series WHERE name = 'Precision Series'), 'Tolerance', 'text', true, 3);

-- Update coating options
UPDATE public.specification_templates 
SET spec_options = '["Uncoated", "TiN", "TiCN", "TiAlN"]'::jsonb 
WHERE spec_name = 'Coating';

-- Insert some sample products
INSERT INTO public.products (series_id, article_number, name, description, price, specifications, inventory_count) VALUES 
  ((SELECT id FROM public.series WHERE name = 'Heavy Duty Series'), 'HD-001', 'Heavy Duty Drill Bit 10mm', 'Industrial drill bit for heavy applications', 29.99, '{"Diameter": "10", "Length": "150", "Coating": "TiN"}', 50),
  ((SELECT id FROM public.series WHERE name = 'Heavy Duty Series'), 'HD-002', 'Heavy Duty Drill Bit 12mm', 'Industrial drill bit for heavy applications', 34.99, '{"Diameter": "12", "Length": "160", "Coating": "TiCN"}', 35),
  ((SELECT id FROM public.series WHERE name = 'Precision Series'), 'PR-001', 'Precision End Mill 6mm', 'High precision end mill for fine work', 45.99, '{"Diameter": "6", "Length": "100", "Tolerance": "±0.01mm"}', 25);