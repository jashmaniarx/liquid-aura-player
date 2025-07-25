import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: {
					DEFAULT: 'hsl(var(--background))',
					deep: 'hsl(var(--background-deep))',
					surface: 'hsl(var(--background-surface))'
				},
				foreground: 'hsl(var(--foreground))',
				glass: {
					background: 'hsl(var(--glass-background))',
					border: 'hsl(var(--glass-border))',
					foreground: 'hsl(var(--glass-foreground))'
				},
				neon: {
					aqua: 'hsl(var(--neon-aqua))',
					violet: 'hsl(var(--neon-violet))',
					soft: 'hsl(var(--neon-soft))'
				}
			},
			fontFamily: {
				display: 'var(--font-display)',
				text: 'var(--font-text)'
			},
			backdropBlur: {
				glass: '40px',
				control: '20px',
				subtle: '10px'
			},
			boxShadow: {
				glass: 'var(--shadow-glass)',
				'glass-lg': 'var(--shadow-glass-lg)',
				'glow-aqua': 'var(--shadow-glow-aqua)',
				'glow-violet': 'var(--shadow-glow-violet)'
			},
			borderRadius: {
				glass: 'var(--radius-glass)',
				control: 'var(--radius-control)',
				capsule: 'var(--radius-capsule)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'glow-pulse': {
					'0%, 100%': { filter: 'drop-shadow(0 0 20px hsl(var(--neon-aqua) / 0.3))' },
					'50%': { filter: 'drop-shadow(0 0 30px hsl(var(--neon-aqua) / 0.6))' }
				},
				'glass-shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '0.8' },
					'100%': { transform: 'scale(1)', opacity: '0' }
				}
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'glass-shimmer': 'glass-shimmer 2s ease-in-out infinite',
				'ripple': 'ripple 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
