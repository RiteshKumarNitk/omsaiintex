export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  resume?: File | null;
}

export interface ContactInfo {
  label: string;
  value: string;
}
