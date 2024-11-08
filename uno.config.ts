import { defineConfig, presetAttributify, presetUno } from 'unocss'
import autoUno from './src'

export default defineConfig({
  presets: [presetAttributify({}), presetUno(), autoUno(['border-radius$px'])],
  variants: [],
  rules: [
    ['abs', { position: 'absolute' }],
    ['aic', { 'align-items': 'center' }],
    ['jcc', { 'justify-content': 'center' }],
    ['aifs', { 'align-items': 'flex-start' }],
    ['aife', { 'align-items': 'flex-end' }],
    ['jcfs', { 'justify-content': 'flex-start' }],
    ['jcfe', { 'justify-content': 'flex-end' }],
    ['jcsb', { 'justify-content': 'space-between' }],
    ['jcsa', { 'justify-content': 'space-around' }],
    ['fdc', { 'flex-direction': 'column' }],
    ['fdr', { 'flex-direction': 'row' }],
    ['center', { display: 'flex', 'justify-content': 'center', 'align-items': 'center', width: '100%' }],
    ['start', { display: 'flex', 'justify-content': 'flex-start', 'align-items': 'flex-start' }],
    ['end', { display: 'flex', 'justify-content': 'flex-end', 'align-items': 'flex-end' }],
    ['...', { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }],
    ['fwb', { 'font-weight': 'bold' }]    
  ]
})
