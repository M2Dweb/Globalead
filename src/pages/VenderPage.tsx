import React from 'react';
import VenderForm from '../components/VenderForm';

// Página /vender («Quanto poderá valer a sua casa?»): o formulário curto dos proprietários. É a página dos QR codes
// (?o=escritorio|montra|cartoes|folhetos|placas) e dos links de recomendação (?r=<código>) gerados no CRM.
const VenderPage: React.FC = () => (
  <div className="min-h-[60vh] bg-white pt-[72px]">{/* o espaço do cabeçalho fixo (como na página Sobre) */}
    <VenderForm />
  </div>
);

export default VenderPage;
