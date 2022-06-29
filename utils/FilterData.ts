  export const projectCategories: readonly ProjectCategoryOption[] = [
    { value: 'Solana', label: 'Solana' },
    { value: 'NFT', label: 'NFT' },
    { value: 'Airdrops', label: 'Airdrops' },
    { value: 'Protocol', label: 'Protocol' },
    { value: 'Staking', label: 'Staking' },
  ]

  export interface ProjectCategoryOption {
    readonly value: string;
    readonly label: string;
  }
  
  
  export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  
  export const colourOptions: readonly ColourOption[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];
  

  
  // let bigOptions = [];
  // for (let i = 0; i < 10000; i++) {
  // 	bigOptions = bigOptions.concat(colourOptions);
  // }
  
  export interface GroupedOption {
    readonly label: string;
    readonly options: readonly ProjectCategoryOption[];
  }
  
  export const groupedOptions: readonly GroupedOption[] = [
    {
      label: 'Category Tag',
      options: projectCategories,
    },
  ];
  