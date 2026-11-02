"use client";

import type { ReactNode } from "react";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../site-config";

type WhatsAppLinkProps = {
  children: ReactNode;
  className: string;
  message?: string;
};

export function WhatsAppLink({ children, className, message }: WhatsAppLinkProps) {
  return (
    <a
      className={className}
      href={buildWhatsAppUrl(message ?? defaultWhatsAppMessage)}
      rel="noreferrer"
      target="_blank"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L3 20l1.2-4.9a8.4 8.4 0 1 1 16.3-3.5Z" />
        <path d="M8.2 8.1c.3-.5.6-.5.9-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.6.7c-.2.2-.2.4-.1.6.4.8 1.1 1.5 1.9 1.9.2.1.4.1.6-.1l.7-.7c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.3.4.5 0 .3-.1.8-.5 1.1-.4.4-1 .6-1.6.5-1.5-.2-3.2-1.1-4.5-2.4-1.3-1.3-2.1-2.8-2.2-4.1 0-.5.2-1.1.6-1.5Z" />
      </svg>
      <span>{children}</span>
    </a>
  );
}
