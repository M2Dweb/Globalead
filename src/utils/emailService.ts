import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';

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
  area_max?: string;
  num_quartos?: string;
  num_casas_banho?: string;
}

// Função para obter o prefixo de categoria baseado na página
const getCategoryPrefix = (page: string): string => {
  const prefixes: Record<string, string> = {
    'contato': '[CONTATO]',
    'venda_imovel': '[IMOVEL-VENDA]',
    'compra_imovel': '[IMOVEL-COMPRA]',
    'credito_habilitacao': '[CREDITO]',
    'seguros': '[SEGUROS]',
    'blog': '[BLOG]',
    'clientes': '[CLIENTES]',
    'geral': '[GERAL]',
    'home': '[GERAL]',
    'contact': '[CONTATO]',
    'contacto': '[CONTATO]'
  };
  
  // Retorna o prefixo ou [GERAL] se não encontrar
  return prefixes[page] || '[GERAL]';
};

// Função para obter o assunto formatado com prefixo
const getFormattedSubject = (formData: FormData): string => {
  const categoryPrefix = getCategoryPrefix(formData.page);
  
  // Se o usuário forneceu um assunto, usa ele
  if (formData.assunto && formData.assunto.trim() !== '') {
    return `${categoryPrefix} ${formData.assunto}`;
  }
  
  // Caso contrário, cria um assunto padrão baseado na página
  const defaultSubjects: Record<string, string> = {
    'contato': 'Contacto Geral',
    'venda_imovel': 'Venda de Imóvel',
    'compra_imovel': 'Compra de Imóvel',
    'credito_habilitacao': 'Crédito Habitação',
    'seguros': 'Seguros',
    'blog': 'Contacto via Blog',
    'clientes': 'Novo Cliente',
    'geral': 'Novo Contacto',
    'home': 'Contacto via Website'
  };
  
  const defaultSubject = defaultSubjects[formData.page] || 'Novo Contacto';
  return `${categoryPrefix} ${defaultSubject}`;
};

// Guarda a submissão no Supabase (silencioso — não bloqueia o envio de email)
const saveSubmission = async (formData: FormData): Promise<void> => {
  try {
    const extraData: Record<string, any> = {};
    if (formData.preço)               extraData.preco              = formData.preço;
    if (formData.tipo_ajuda)          extraData.tipo_ajuda         = formData.tipo_ajuda;
    if (formData.valor_emprestimo)    extraData.valor_emprestimo   = formData.valor_emprestimo;
    if (formData.escolha_imovel)      extraData.escolha_imovel     = formData.escolha_imovel;
    if (formData.vender_imovel_atual) extraData.vender_imovel_atual= formData.vender_imovel_atual;
    if (formData.num_proponentes)     extraData.num_proponentes    = formData.num_proponentes;
    if (formData.rendimento_agregado) extraData.rendimento_agregado= formData.rendimento_agregado;
    if (formData.area_min)            extraData.area_min           = formData.area_min;
    if (formData.area_max)            extraData.area_max           = formData.area_max;
    if (formData.num_quartos)         extraData.num_quartos        = formData.num_quartos;
    if (formData.num_casas_banho)     extraData.num_casas_banho    = formData.num_casas_banho;

    await supabase.from('contact_submissions').insert([{
      nome:          formData.nome,
      apelido:       formData.apelido   || null,
      email:         formData.email,
      telemovel:     formData.telemovel  || null,
      assunto:       formData.assunto   || null,
      mensagem:      formData.mensagem  || null,
      meio_contacto: formData.meio_contacto || null,
      horario:       formData.horario   || null,
      distrito:      formData.distrito  || null,
      cod_postal:    formData.cod_postal || null,
      page:          formData.page,
      extra_data:    extraData,
      status:        'novo',
    }]);
  } catch (err) {
    // Não bloquear o envio de email se o Supabase falhar
    console.warn('[emailService] Aviso: não foi possível guardar submissão no Supabase:', err);
  }
};

export const sendEmail = async (formData: FormData): Promise<boolean> => {
  // Configure these with your EmailJS credentials
  const serviceId = 'service_t50zwho';
  const templateId = 'template_wisf0rm';
  const publicKey = '9RG68jew5HcgT8N6e';

  try {
    // Guardar no Supabase (não bloqueia mesmo que falhe)
    await saveSubmission(formData);

    // Obter assunto formatado com prefixo
    const formattedSubject = getFormattedSubject(formData);
    
    const templateParams = {
      to_email: 'globaleadgroup@gmail.com',
      from_name: `${formData.nome} ${formData.apelido || ''}`.trim(),
      from_email: formData.email,
      phone: formData.telemovel || '',
      // ⭐ ASSUNTO COM PREFIXO PARA FILTROS GMAIL ⭐
      subject: formattedSubject,
      message: formData.mensagem || '',
      contact_method: formData.meio_contacto || '',
      schedule: formData.horario || '',
      district: formData.distrito || '',
      postal_code: formData.cod_postal || '',
      property_choice: formData.escolha_imovel || '',
      price: formData.preço || '',
      area_min: formData.area_min || '',
      area_max: formData.area_max || '',
      bedrooms: formData.num_quartos || '',
      bathrooms: formData.num_casas_banho || '',
      loan_amount: formData.valor_emprestimo || '',
      sell_current: formData.vender_imovel_atual || '',
      num_applicants: formData.num_proponentes || '',
      household_income: formData.rendimento_agregado || '',
      help_type: formData.tipo_ajuda || '',
      page_source: formData.page,
      // Adicionar a categoria para referência no template
      category_prefix: getCategoryPrefix(formData.page).replace(/[\[\]]/g, '')
    };

    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log(' Email enviado com sucesso!', {
      status: response.status,
      subject: formattedSubject,
      page: formData.page
    });
    return true;
  } catch (error) {
    console.error(' Erro ao enviar email:', error);
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

// Função de utilidade para debug
export const debugEmailCategories = () => {
  const testPages = [
    'contato',
    'venda_imovel', 
    'compra_imovel',
    'credito_habilitacao',
    'seguros',
    'blog',
    'clientes',
    'outra_pagina'
  ];
  
  console.log('📧 Prefixos de Categoria para Filtros Gmail:');
  testPages.forEach(page => {
    const prefix = getCategoryPrefix(page);
    console.log(`  ${page}: ${prefix}`);
  });
};