import emailjs from '@emailjs/browser';

// Configuração do EmailJS
const EMAILJS_SERVICE_ID = 'your_service_id'; // Substitua pelo seu Service ID
const EMAILJS_TEMPLATE_ID = 'your_template_id'; // Substitua pelo seu Template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // Substitua pelo seu Public Key

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface FormData {
  nome: string;
  apelido?: string;
  telemovel?: string;
  email: string;
  assunto?: string;
  meio_contacto?: string;
  horario?: string;
  mensagem?: string;
  localizacao?: string;
  codigo_postal?: string;
  pretendo?: string;
  tipo_imovel?: string;
  preco_max?: string;
  area_min?: string;
  num_quartos?: string;
  num_casas_banho?: string;
  servico?: string;
  contacto?: string;
  preferencia?: string;
  page: string;
}

export const sendEmail = async (formData: FormData): Promise<boolean> => {
  try {
    const templateParams = {
      ...formData,
      to_email: 'geral@globalead.pt', // Email de destino
      timestamp: new Date().toLocaleString('pt-PT'),
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email enviado com sucesso:', result);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};