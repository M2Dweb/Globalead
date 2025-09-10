import emailjs from '@emailjs/browser';

export interface FormData {
  nome: string;
  apelido?: string;
  telemovel?: string;
  email: string;
  assunto?: string;
  meio_contacto?: string; 
  cod_postal?: string; 
  horario?: string; 
  distrito?: string; 
  mensagem?: string;
  page: string;
  preço?: string;
  tipo_ajuda?: string;
  valor_emprestimo?: string;
  escolha_imovel?: string;
  vender_imovel_atual?: string;
  num_proponentes?: string;
  rendimento_agregado?: string;
  area_min?: string;
  num_quartos?: string;
  num_casas_banho?: string;
}



export const sendEmail = async (formData: FormData): Promise<boolean> => {
  // Configure these with your EmailJS credentials
  const serviceId = 'service_t50zwho';
  const templateId = 'template_wisf0rm';
  const publicKey = '9RG68jew5HcgT8N6e';

  try {
    const templateParams = {
      to_email: 'globaleadgroup@gmail.com',
      from_name: `${formData.nome} ${formData.apelido || ''}`.trim(),
      from_email: formData.email,
      phone: formData.telemovel,
      subject: formData.assunto || `Contacto via ${formData.page}`,
      message: formData.mensagem || 'Sem mensagem específica',
      contact_method: formData.meio_contacto,   // WhatsApp / Telefone / Email
      schedule: formData.horario,              // Horário de contacto
      district: formData.distrito,             // NOVO: distrito real
      page_source: formData.page,
      help_type: formData.tipo_ajuda,
      loan_amount: formData.valor_emprestimo,
      property_choice: formData.escolha_imovel,
      sell_current: formData.vender_imovel_atual,
      num_applicants: formData.num_proponentes,
      household_income: formData.rendimento_agregado,
      area_min: formData.area_min,
      bedrooms: formData.num_quartos,
      bathrooms: formData.num_casas_banho,
      price: formData.preço,
      postal_code: formData.cod_postal
    };


    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('Email enviado com sucesso!', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};

export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submission', {
    form_type: formType,
    event_category: 'engagement'
  });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    event_category: 'contact'
  });
};

export const trackPropertyView = (propertyId: string) => {
  trackEvent('property_view', {
    property_id: propertyId,
    event_category: 'real_estate'
  });
};