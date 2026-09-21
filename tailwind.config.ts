import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

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
			padding: '1.25rem',
			screens: {
				'2xl': '1320px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				/* ── The Edible Codex — brand identity: gold · black · navy ── */
				gold: {
					50: '#FBF6E7',
					100: '#F5E9C4',
					200: '#EBD79A',
					300: '#DEC170',
					400: '#D3AE50',
					DEFAULT: '#C9A227',
					500: '#C9A227',
					600: '#A9851C',
					700: '#856615',
					800: '#5E480F',
					900: '#3A2C08'
				},
				navy: {
					50: '#EEF2F9',
					100: '#D4DEEE',
					200: '#A7BADB',
					300: '#6E86B4',
					400: '#3D5687',
					DEFAULT: '#132B52',
					500: '#132B52',
					600: '#0F2241',
					700: '#0B1B33',
					800: '#081325',
					900: '#050D19'
				},
				ink: {
					DEFAULT: '#0A0A0B',
					soft: '#121214',
					muted: '#1C1C20'
				},
				ivory: {
					DEFAULT: '#F7F3EA',
					dim: '#EDE6D8'
				}
			},
			fontFamily: {
				display: ['Playfair Display', 'Amiri', 'Georgia', 'serif'],
				serif: ['Playfair Display', 'Amiri', 'Georgia', 'serif'],
				sans: ['Inter', 'Tajawal', 'system-ui', 'sans-serif'],
				arabic: ['Tajawal', 'Inter', 'system-ui', 'sans-serif'],
				'arabic-display': ['Amiri', 'Playfair Display', 'Georgia', 'serif']
			},
			letterSpacing: {
				luxe: '0.28em'
			},
			backgroundImage: {
				'gold-gradient': 'linear-gradient(120deg, #9A7B1F 0%, #C9A227 28%, #F2D98A 50%, #C9A227 72%, #9A7B1F 100%)',
				'navy-gradient': 'linear-gradient(160deg, #132B52 0%, #0B1B33 55%, #0A0A0B 100%)',
				'ink-fade': 'linear-gradient(to top, rgba(10,10,11,0.94) 0%, rgba(10,10,11,0.55) 45%, rgba(10,10,11,0) 100%)'
			},
			boxShadow: {
				luxe: '0 24px 60px -24px rgba(10, 10, 11, 0.55)',
				'gold-glow': '0 0 0 1px rgba(201,162,39,0.35), 0 18px 45px -20px rgba(201,162,39,0.55)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(14px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-slow': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				shimmer: {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '200% 50%' }
				},
				'marquee-x': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out both',
				'fade-in-slow': 'fade-in-slow 1.2s ease-out both',
				shimmer: 'shimmer 6s linear infinite',
				marquee: 'marquee-x 32s linear infinite'
			}
		}
	},
	plugins: [animate, typography],
} satisfies Config;
