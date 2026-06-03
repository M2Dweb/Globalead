import React from 'react';
import { Home, Users, MessageSquare, FileText, Star } from 'lucide-react';

interface AdminStatsProps {
  propertiesCount: number;
  leadsCount: number;
  contactsCount: number;
  postsCount: number;
  featuredCount: number;
  leads: any[];     // registos com created_at
  contacts: any[];  // registos com created_at
}

const MONTHS_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MAX_BAR_PX = 90;

const AdminStats: React.FC<AdminStatsProps> = ({
  propertiesCount,
  leadsCount,
  contactsCount,
  postsCount,
  featuredCount,
  leads,
  contacts,
}) => {
  // Construir os últimos 6 meses
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, idx) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - idx), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, label: MONTHS_PT[d.getMonth()], leads: 0, contacts: 0 };
  });

  const bucket = (arr: any[], field: 'leads' | 'contacts') => {
    (arr || []).forEach((item) => {
      if (!item?.created_at) return;
      const d = new Date(item.created_at);
      if (isNaN(d.getTime())) return;
      const m = months.find((mo) => mo.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (m) m[field] += 1;
    });
  };
  bucket(leads, 'leads');
  bucket(contacts, 'contacts');

  const maxVal = Math.max(1, ...months.map((m) => Math.max(m.leads, m.contacts)));

  const stats = [
    { label: 'Imóveis', value: propertiesCount, icon: <Home className="h-5 w-5" />, color: 'text-[#79b2e9]' },
    { label: 'Leads', value: leadsCount, icon: <Users className="h-5 w-5" />, color: 'text-green-600' },
    { label: 'Contactos', value: contactsCount, icon: <MessageSquare className="h-5 w-5" />, color: 'text-orange-500' },
    { label: 'Artigos', value: postsCount, icon: <FileText className="h-5 w-5" />, color: 'text-purple-600' },
    { label: 'Destaques', value: featuredCount, icon: <Star className="h-5 w-5" />, color: 'text-yellow-500' },
  ];

  return (
    <>
      {/* Totais rápidos */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Totais</h3>
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className={`flex justify-center mb-1 ${s.color}`}>{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900 leading-none">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leads & Contactos por mês */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Leads &amp; Contactos (6 meses)
        </h3>
        <div className="flex items-end justify-between gap-2" style={{ height: MAX_BAR_PX + 22 }}>
          {months.map((m) => (
            <div key={m.key} className="flex-1 flex flex-col items-center justify-end">
              <div className="flex items-end justify-center gap-0.5 w-full">
                <div
                  className="w-1/2 max-w-[14px] bg-[#79b2e9] rounded-t"
                  style={{ height: Math.round((m.leads / maxVal) * MAX_BAR_PX) }}
                  title={`${m.leads} leads`}
                />
                <div
                  className="w-1/2 max-w-[14px] bg-orange-400 rounded-t"
                  style={{ height: Math.round((m.contacts / maxVal) * MAX_BAR_PX) }}
                  title={`${m.contacts} contactos`}
                />
              </div>
              <span className="mt-1 text-[10px] text-gray-400">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#79b2e9] mr-1.5" />
            Leads
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-orange-400 mr-1.5" />
            Contactos
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminStats;
