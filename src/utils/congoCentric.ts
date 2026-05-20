import { format, formatDistance } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import i18next from 'i18next';

/**
 * Format a number as CDF (Franc Congolais) currency
 * @param amount The amount to format
 * @param includeCurrency Whether to include the currency symbol
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, includeCurrency = true): string => {
  // Format with thousand separators
  const formattedAmount = new Intl.NumberFormat(
    i18next.language === 'fr' ? 'fr-CD' : 'en-CD', 
    { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  ).format(amount);
  
  // Add currency symbol based on language
  return includeCurrency 
    ? `${formattedAmount} ${i18next.t('currencySymbol')}`
    : formattedAmount;
};

/**
 * Format a date in Congo-centric format (dd/mm/yyyy)
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  const locale = i18next.language === 'fr' ? fr : enUS;
  
  // Format as dd/mm/yyyy for both languages
  return format(date, 'dd/MM/yyyy', { locale });
};

/**
 * Format a time in Congo-centric format (24-hour)
 * @param date The date to format
 * @returns Formatted time string
 */
export const formatTime = (date: Date): string => {
  const locale = i18next.language === 'fr' ? fr : enUS;
  
  // Format as 24-hour time (HH:mm)
  return format(date, 'HH:mm', { locale });
};

/**
 * Format a date and time in Congo-centric format
 * @param date The date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date): string => {
  const locale = i18next.language === 'fr' ? fr : enUS;
  
  // Format as dd/mm/yyyy HH:mm
  return format(date, 'dd/MM/yyyy HH:mm', { locale });
};

/**
 * Get the current date and time in Central Africa Time (CAT)
 * @returns Current date in CAT
 */
export const getCurrentCATDateTime = (): Date => {
  // Create a date object for the current time
  const now = new Date();
  
  // CAT is UTC+2, so we need to adjust the time
  // First get the UTC time in milliseconds
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  
  // Then add the CAT offset (UTC+2 = +2 hours)
  return new Date(utcTime + (2 * 3600000));
};

/**
 * Format a relative time (e.g., "2 hours ago")
 * @param date The date to format
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (date: Date): string => {
  const locale = i18next.language === 'fr' ? fr : enUS;
  
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale
  });
};