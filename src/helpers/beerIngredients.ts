export const beer_ingredients = [
  {
    id: 'water',
    label: 'Agua',
    value: 'Agua',
  },
  {
    id: 'hop',
    label: 'Lúpulo',
    value: 'Lúpulo',
  },
  {
    id: 'malt',
    label: 'Malta',
    value: 'Malta',
  },
  {
    id: 'yeast',
    label: 'Levadura',
    value: 'Levadura',
  },
  {
    id: 'barley',
    label: 'Cebada',
    value: 'Cebada',
  },
  {
    id: 'sorghum',
    label: 'Sorgo',
    value: 'Sorgo',
  },
  {
    id: 'rice',
    label: 'Arroz',
    value: 'Arroz',
  },
  {
    id: 'coffee',
    label: 'Café',
    value: 'Café',
  },
  {
    id: 'honey',
    label: 'Miel',
    value: 'Miel',
  },
  {
    id: 'chili',
    label: 'Chile',
    value: 'Chile',
  },
  {
    id: 'clove',
    label: 'Clavo',
    value: 'Clavo',
  },
  {
    id: 'rosemary',
    label: 'Romero',
    value: 'Romero',
  },
  {
    id: 'anise',
    label: 'Anís',
    value: 'Anís',
  },
  {
    id: 'orange_peel',
    label: 'Piel de Naranja',
    value: 'Piel de Naranja',
  },
  {
    id: 'black_pepper',
    label: 'Pimienta Negra',
    value: 'Pimienta Negra',
  },
  {
    id: 'tequila',
    label: 'Tequila',
    value: 'Tequila',
  },
  {
    id: 'gin',
    label: 'Ginebra',
    value: 'Ginebra',
  },
];

export const beer_types = [
  {
    id: 'ale',
    label: 'Ale',
    value: 'Ale',
    types: [
      {
        id: 'brown_ale',
        label: 'Brown Ale',
        value: 'Brown Ale',
      },
      {
        id: 'trap_abadia',
        label: 'Trapenses y Abadía',
        value: 'Trapenses y Abadía',
      },
      {
        id: 'mild_ale',
        label: 'Mild Ale',
        value: 'Mild Ale',
      },
      {
        id: 'old_ale',
        label: 'Old Ale',
        value: 'Old Ale',
      },
      {
        id: 'ipa',
        label: 'Indian Pale Ale (IPA)',
        value: 'Indian Pale Ale (IPA)',
      },
      {
        id: 'stout',
        label: 'Stout',
        value: 'Stout',
      },
      {
        id: 'porter',
        label: 'Porter',
        value: 'Porter',
      },
    ]
  },
  {
    id: 'lager',
    label: 'Lager',
    value: 'Lager',
    types: [
      {
        id: 'bock',
        name: 'Bock',
        value: 'Bock',
      },
      {
        id: 'dark',
        name: 'Negra',
        value: 'Negra',
      },
      {
        id: 'pale_lager',
        name: 'Pale Lager',
        value: 'Pale Lager',
      },
      {
        id: 'pilsner',
        name: 'Pilsner',
        value: 'Pilsner',
      },
    ]
  },
  {
    id: 'hybrid',
    label: 'Híbridas',
    value: 'Híbridas',
    types: [
      {
        id: 'altbier_kosch',
        name: 'Altbier y Kölsch',
        value: 'Altbier y Kölsch',
      },
      {
        id: 'fruits_vegs',
        name: 'Frutas y Verduras',
        value: 'Frutas y Verduras',
      },
      {
        id: 'herbs_spices',
        name: 'Hiervas y Especias',
        value: 'Hiervas y Especias',
      },
      {
        id: 'old_wood',
        name: 'Envejecidas en madera',
        value: 'Envejecidas en madera',
      },
      {
        id: 'old_smoke',
        name: 'Ahumadas',
        value: 'Ahumadas',
      },
      {
        id: 'champagne',
        name: 'Champagne',
        value: 'Champagne',
      },
    ]
  },
  {
    id: 'wild',
    label: 'Salvaje',
    value: 'Salvaje'
  },
];

export const specialities = {
  'Ale': [
    {
      id: 'brown_ale',
      label: 'Brown Ale',
      value: 'Brown Ale',
    },
    {
      id: 'trap_abadia',
      label: 'Trapenses y Abadía',
      value: 'Trapenses y Abadía',
    },
    {
      id: 'mild_ale',
      label: 'Mild Ale',
      value: 'Mild Ale',
    },
    {
      id: 'old_ale',
      label: 'Old Ale',
      value: 'Old Ale',
    },
    {
      id: 'ipa',
      label: 'Indian Pale Ale (IPA)',
      value: 'Indian Pale Ale (IPA)',
    },
    {
      id: 'stout',
      label: 'Stout',
      value: 'Stout',
    },
    {
      id: 'porter',
      label: 'Porter',
      value: 'Porter',
    },
  ],
  'Lager': [
    {
      id: 'bock',
      label: 'Bock',
      value: 'Bock',
    },
    {
      id: 'dark',
      label: 'Negra',
      value: 'Negra',
    },
    {
      id: 'pale_lager',
      label: 'Pale Lager',
      value: 'Pale Lager',
    },
    {
      id: 'pilsner',
      label: 'Pilsner',
      value: 'Pilsner',
    },
  ],
  'Híbridas': [
    {
      id: 'altbier_kosch',
      label: 'Altbier y Kölsch',
      value: 'Altbier y Kölsch',
    },
    {
      id: 'fruits_vegs',
      label: 'Frutas y Verduras',
      value: 'Frutas y Verduras',
    },
    {
      id: 'herbs_spices',
      label: 'Hiervas y Especias',
      value: 'Hiervas y Especias',
    },
    {
      id: 'old_wood',
      label: 'Envejecidas en madera',
      value: 'Envejecidas en madera',
    },
    {
      id: 'old_smoke',
      label: 'Ahumadas',
      value: 'Ahumadas',
    },
    {
      id: 'champagne',
      label: 'Champagne',
      value: 'Champagne',
    },
  ],
  'Salvaje': [
    {
      id: 'no_speciality',
      label: 'Sin Especialidad',
      value: 'Sin Especialidad',
    },
  ]
}