export interface OrderFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  budget: string;
  deadline: string;
  description: string;
  notes: string;
  file: File | null;
}

export interface OrderResponse {
  order_id: string;
  full_name: string;
  email: string;
  service: string;
  status: string;
  created_at: string;
  file_url: string | null;
}
