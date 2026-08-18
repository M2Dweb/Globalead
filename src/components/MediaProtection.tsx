import React, { useEffect } from 'react';

/**
 * Dificulta a cópia das fotos e vídeos do site.
 *
 * O que bloqueia:
 * - Botão direito por cima de uma imagem/vídeo (menu "Guardar imagem como…").
 * - Arrastar a imagem para fora do browser (drag & drop para o ambiente de trabalho).
 * - Toque longo no telemóvel (menu de partilha/guardar do iOS e Android).
 * - Seleção da imagem em conjunto com texto.
 *
 * NOTA IMPORTANTE: nenhum site consegue impedir por completo o download de uma
 * imagem — o browser tem de a descarregar para a mostrar, por isso quem souber
 * usar as ferramentas de programador consegue sempre chegar ao ficheiro.
 * Isto trava a cópia casual (que é a esmagadora maioria dos casos). Para
 * proteção real usa-se marca de água, que já está aplicada nas fotos.
 *
 * O texto normal da página continua selecionável e copiável.
 */
const MediaProtection: React.FC = () => {
  useEffect(() => {
    const isMedia = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest('img, video, picture');

    const blockIfMedia = (e: Event) => {
      if (isMedia(e.target)) e.preventDefault();
    };

    document.addEventListener('contextmenu', blockIfMedia);
    document.addEventListener('dragstart', blockIfMedia);

    return () => {
      document.removeEventListener('contextmenu', blockIfMedia);
      document.removeEventListener('dragstart', blockIfMedia);
    };
  }, []);

  return null;
};

export default MediaProtection;
