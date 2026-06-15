import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Please make a POST request' });
  }

  const contactData = JSON.parse(req.body);

  const { error } = await supabase.from('contact').insert([contactData]);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Could not send your message. Please try again' });
  }

  // Success message
  return res
    .status(200)
    .json({ success: true, message: 'Thanks for your message! We will be in touch soon! :)' });
}
