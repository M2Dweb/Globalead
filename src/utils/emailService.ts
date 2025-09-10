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

const renderRow = (label: string, value?: string) =>
  value ? `<tr><td style="padding:5px;"><strong>${label}:</strong></td><td>${value}</td></tr>` : '';

const buildMessageHTML = (data: FormData) => `
<div style="font-family: Arial, sans-serif; background:#f4f7fa; padding:20px; color:#333;">
  <div style="max-width:700px; margin:0 auto; background:#fff; border-radius:10px; padding:20px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
    <h2 style="text-align:center; color:#0d2233; margin-bottom:20px;">📩 Novo Pedido do Site</h2>
    <hr style="border:none; border-top:2px solid #79b2e9; margin-bottom:20px;">

    <h3 style="color:#0d2233; border-left:4px solid #79b2e9; padding-left:10px;">👤 Dados do Cliente</h3>
    <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
      ${renderRow('Nome', `${data.nome} ${data.apelido || ''}`.trim())}
      ${renderRow('Email', data.email)}
      ${renderRow('Telefone', data.telemovel)}
      ${renderRow('Meio de Contacto', data.meio_contacto)}
      ${renderRow('Horário', data.horario)}
      ${renderRow('Distrito', data.distrito)}
      ${renderRow('Código Postal', data.cod_postal)}
    </table>

    <h3 style="color:#0d2233; border-left:4px solid #79b2e9; padding-left:10px;">🏡 Detalhes do Imóvel</h3>
    <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
      ${renderRow('Tipo', data.escolha_imovel)}
      ${renderRow('Preço Máx (€)', data.preço)}
      ${renderRow('Área Mínima (m²)', data.area_min)}
      ${renderRow('Quartos', data.num_quartos)}
      ${renderRow('Casas de Banho', data.num_casas_banho)}
      ${renderRow('Vender Imóvel Atual', data.vender_imovel_atual)}
    </table>

    <h3 style="color:#0d2233; border-left:4px solid #79b2e9; padding-left:10px;">💰 Finanças</h3>
    <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
      ${renderRow('Valor do Empréstimo', data.valor_emprestimo)}
      ${renderRow('Nº Proponentes', data.num_proponentes)}
      ${renderRow('Rendimento Agregado', data.rendimento_agregado)}
    </table>

    <h3 style="color:#0d2233; border-left:4px solid #79b2e9; padding-left:10px;">📌 Outros</h3>
    <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
      ${renderRow('Tipo de Ajuda', data.tipo_ajuda)}
      ${renderRow('Assunto', data.assunto)}
      ${renderRow('Mensagem', data.mensagem)}
    </table>

    <hr style="border:none; border-top:1px solid #ccc; margin:20px 0;">
    <p style="text-align:center; font-size:12px; color:#777;">Página de Origem: <strong>${data.page}</strong></p>
  </div>
</div>
`;

export const sendEmail = async (formData: FormData): Promise<boolean> => {
  const serviceId = 'service_t50zwho';
  const templateId = 'template_wisf0rm';
  const publicKey = '9RG68jew5HcgT8N6e';

  try {
    const messageHTML = buildMessageHTML(formData);

    const templateParams = {
      to_email: 'globaleadgroup@gmail.com',
      message_html: messageHTML, // <- Só isso no template!
    };

    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('Email enviado com sucesso!', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};
