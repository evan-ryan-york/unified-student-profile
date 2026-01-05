'use client';

import { Box, Typography } from '@mui/material';
import { Check, Pen, Sparkles, Star, AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';

type BadgeVariant =
  | 'on_track'
  | 'off_track'
  | 'willow_generated'
  | 'custom'
  | 'ai_review'
  | 'top_pick'
  | 'default'
  | 'success'
  | 'warning'
  | 'error';

interface BadgeProps {
  variant: BadgeVariant;
  children?: ReactNode;
  showIcon?: boolean;
  size?: 'small' | 'medium';
  className?: string;
}

const badgeStyles: Record<BadgeVariant, { bg: string; text: string; iconColor: string }> = {
  on_track: {
    bg: '#DCFCE7',
    text: '#15803D',
    iconColor: '#16A34A',
  },
  off_track: {
    bg: '#FEE2E2',
    text: '#B91C1C',
    iconColor: '#DC2626',
  },
  willow_generated: {
    bg: '#F3F4F6',
    text: '#4B5563',
    iconColor: '#6B7280',
  },
  custom: {
    bg: '#FEF3C7',
    text: '#B45309',
    iconColor: '#D97706',
  },
  ai_review: {
    bg: '#FFE4E6',
    text: '#BE123C',
    iconColor: '#E11D48',
  },
  top_pick: {
    bg: '#FEF3C7',
    text: '#B45309',
    iconColor: '#F59E0B',
  },
  default: {
    bg: '#F3F4F6',
    text: '#4B5563',
    iconColor: '#6B7280',
  },
  success: {
    bg: '#DCFCE7',
    text: '#15803D',
    iconColor: '#16A34A',
  },
  warning: {
    bg: '#FEF3C7',
    text: '#B45309',
    iconColor: '#D97706',
  },
  error: {
    bg: '#FEE2E2',
    text: '#B91C1C',
    iconColor: '#DC2626',
  },
};

const badgeLabels: Partial<Record<BadgeVariant, string>> = {
  on_track: 'On track',
  off_track: 'Off track',
  willow_generated: 'Willow-generated',
  custom: 'Custom',
  ai_review: 'AI Review',
  top_pick: 'Top pick for you',
};

const getBadgeIcon = (variant: BadgeVariant, color: string): ReactNode => {
  switch (variant) {
    case 'on_track':
    case 'success':
      return <Check size={12} style={{ color }} />;
    case 'off_track':
    case 'error':
      return <AlertCircle size={12} style={{ color }} />;
    case 'willow_generated':
    case 'ai_review':
    case 'default':
      return <Sparkles size={12} style={{ color }} />;
    case 'custom':
    case 'warning':
      return <Pen size={12} style={{ color }} />;
    case 'top_pick':
      return <Star size={12} style={{ color, fill: color }} />;
    default:
      return null;
  }
};

export function Badge({
  variant,
  children,
  showIcon = true,
  size = 'small',
  className = '',
}: BadgeProps) {
  const styles = badgeStyles[variant];
  const label = children ?? badgeLabels[variant];
  const icon = getBadgeIcon(variant, styles.iconColor);

  return (
    <Box
      className={className}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        borderRadius: '9999px',
        fontWeight: 500,
        backgroundColor: styles.bg,
        color: styles.text,
        px: size === 'small' ? 1 : 1.5,
        py: size === 'small' ? 0.25 : 0.5,
        fontSize: size === 'small' ? '12px' : '14px',
      }}
    >
      {showIcon && icon}
      <Typography
        component="span"
        sx={{
          fontWeight: 500,
          fontSize: 'inherit',
          lineHeight: 1,
          color: 'inherit',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// Specialized badge components for convenience
export function OnTrackBadge({ status }: { status: 'on_track' | 'off_track' }) {
  return <Badge variant={status} />;
}

export function MilestoneTypeBadge({ type }: { type: 'willow_generated' | 'custom' }) {
  return <Badge variant={type} />;
}

export function TopPickBadge() {
  return <Badge variant="top_pick" />;
}

export function AIReviewBadge() {
  return <Badge variant="ai_review" />;
}

export default Badge;
