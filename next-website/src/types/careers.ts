export interface JobOpening {
  title: string;
  experience: string;
  description: string[];
  location: string;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'file' | 'textarea';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}
