# Project Rules

## 1. Tailwind CSS Best Practices
You are a Senior Front-End Developer and expert in Tailwind CSS implementation. Follow these guidelines when writing Tailwind CSS code:

Input: A description of a UI component or layout requirement.
Output: Clean, accessible, and properly structured Tailwind CSS implementation.

Best Practices:
- Always use Tailwind classes for styling HTML elements; avoid using custom CSS or inline styles
- Use Tailwind's utility-first approach and leverage composition over inheritance
- Prioritize readability by using consistent ordering of utility classes
- Use the "class:" directive instead of ternary operators for conditional classes when appropriate
- Apply proper responsive design using Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
- Implement proper dark mode support using the dark: variant
- Ensure all UI elements have appropriate accessibility attributes
- Use Tailwind's state variants (:hover, :focus, :active, etc.) consistently

Example:
Input: "Create a responsive card component with an image, title, description, and action button that works in both light and dark mode"

Output:
```jsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onActionClick: () => void;
}

export const Card = ({ 
  title, 
  description, 
  imageUrl, 
  onActionClick 
}: CardProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover" 
        />
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {description}
        </p>
        
        <button
          onClick={onActionClick}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          aria-label={`Action for ${title}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};
```

Important Implementation Notes:
1. Classes are grouped logically (layout → typography → colors → states)
2. Dark mode variants are included directly with related classes
3. Proper focus states and accessibility attributes are applied
4. Component is responsive by default and adapts to container size
5. Semantic HTML elements are used where appropriate



## 2. React Development Standards
Siga estas diretrizes ao desenvolver componentes React:

### Estrutura de Componentes
- Use componentes funcionais com hooks em vez de componentes de classe
- Organize os imports em ordem: React, bibliotecas externas, componentes, hooks, utils, tipos, estilos
- Mantenha componentes pequenos e com responsabilidade única
- Extraia lógica complexa para hooks customizados
- Use React.memo() para componentes que renderizam frequentemente com as mesmas props

### Props e Estado
- Defina tipos explícitos para props usando TypeScript
- Use desestruturação para acessar props e estado
- Prefira useState para estado local simples e useReducer para estado complexo
- Evite props drilling usando Context API para estados globais
- Use prop spreading com cautela, prefira passar props explicitamente

### Renderização e Performance
- Evite renderizações desnecessárias usando React.memo, useMemo e useCallback
- Implemente lazy loading para componentes grandes usando React.lazy e Suspense
- Use keys únicas e estáveis em listas para otimizar reconciliação
- Evite operações pesadas durante a renderização, mova-as para useEffect ou useMemo
- Implemente feedback visual para operações assíncronas (loading states)

### Acessibilidade
- Use elementos semânticos apropriados (button, nav, main, etc.)
- Implemente navegação por teclado para todos os componentes interativos
- Forneça textos alternativos para imagens e ícones
- Use ARIA attributes quando necessário
- Teste componentes com leitores de tela

## 3. TypeScript Guidelines
Siga estas diretrizes ao usar TypeScript no projeto:

### Tipos e Interfaces
- Prefira interfaces para definir objetos públicos e API's
- Use types para unions, intersections e tipos utilitários
- Evite o uso de 'any', prefira 'unknown' quando o tipo não é conhecido
- Crie tipos reutilizáveis para padrões comuns
- Use generics para criar componentes e funções flexíveis

### Tipagem Estrita
- Habilite strict mode no tsconfig.json
- Evite type assertions (as Type) quando possível
- Use type guards para narrowing de tipos (typeof, instanceof, is)
- Implemente verificações de nulidade explícitas
- Defina tipos de retorno para funções não triviais

### Organização
- Mantenha definições de tipos próximas ao código que as utiliza
- Crie arquivos .d.ts para declarações globais
- Use namespaces apenas quando necessário
- Organize tipos relacionados em arquivos separados
- Exporte apenas os tipos necessários para uso externo

### Boas Práticas
- Use enums para valores constantes relacionados
- Aproveite inferência de tipos quando for claro
- Implemente tipagem para APIs externas e bibliotecas
- Use readonly para prevenir mutações indesejadas
- Documente tipos complexos com JSDoc

## 4. Testing Standards
Siga estas diretrizes para testes no projeto:

### Estrutura de Testes
- Use Jest como framework principal de testes
- Organize testes em arquivos .test.tsx ou .spec.tsx próximos ao código testado
- Agrupe testes relacionados em describe blocks
- Nomeie testes de forma descritiva usando it/test ("should do something when...")
- Mantenha testes independentes e isolados

### Testes de Componentes
- Use React Testing Library para testes de componentes
- Teste o comportamento, não a implementação
- Selecione elementos por acessibilidade (getByRole, getByLabelText) em vez de classes ou IDs
- Simule interações do usuário (click, type, etc.)
- Teste diferentes estados e variações de componentes

### Mocks e Stubs
- Mock dependências externas (APIs, serviços)
- Use jest.mock() para módulos completos
- Crie factories para dados de teste reutilizáveis
- Reset mocks entre testes com beforeEach/afterEach
- Evite mocks desnecessários, prefira integração real quando possível

### Cobertura e Qualidade
- Mantenha cobertura de testes acima de 80%
- Implemente testes de integração para fluxos críticos
- Use snapshot testing com moderação
- Execute testes automaticamente em CI/CD pipeline
- Implemente testes de regressão para bugs corrigido