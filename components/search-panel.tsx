'use client'

import { useState } from 'react'
import { X, ChevronRight } from 'lucide-react'

interface SearchPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [category, setCategory] = useState('Escorts')
  const [city, setCity] = useState('Todas las ciudades')
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null)

  if (!isOpen) return null

  const filters = [
    {
      id: 'etnia',
      label: 'Etnia',
      options: ['Latina', 'Europea', 'Asiática', 'Africana', 'Árabe'],
    },
    {
      id: 'nacionalidad',
      label: 'Nacionalidad',
      options: ['Bolivia', 'Argentina', 'Chile', 'Perú', 'Colombia'],
    },
    {
      id: 'edad',
      label: 'Edad',
      options: ['18-25', '25-30', '30-35', '35+'],
    },
    {
      id: 'servicio',
      label: 'Tipo de Servicio',
      options: ['Tours', 'Acompañamiento', 'Consultoría', 'Entretenimiento'],
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-semibold text-gray-900">Buscar</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Dropdowns */}
            <div className="space-y-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>Escorts</option>
                <option>Guías Turísticos</option>
                <option>Servicios Especiales</option>
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>Todas las ciudades</option>
                <option>La Paz</option>
                <option>Santa Cruz</option>
                <option>Cochabamba</option>
                <option>Oruro</option>
              </select>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Buscar aquí..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />

            {/* Filters */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 font-semibold text-gray-900">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 5.707A1 1 0 013 5V3z" />
                </svg>
                Filtros
              </div>

              {filters.map((filter) => (
                <div key={filter.id} className="border-t">
                  <button
                    onClick={() =>
                      setExpandedFilter(
                        expandedFilter === filter.id ? null : filter.id
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 transition"
                  >
                    <span className="text-gray-700 font-medium">{filter.label}</span>
                    <ChevronRight
                      className={`w-5 h-5 text-pink-600 transition-transform ${
                        expandedFilter === filter.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {expandedFilter === filter.id && (
                    <div className="bg-gray-50 px-3 py-2 space-y-2">
                      {filter.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-4">
              BUSCAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
