export interface Hospital {
    id: number;
    nome: string;
    created_at: string;
    updated_at: string;
}

export interface Utente {
    id: number;
    nome: string;
    processo: number;
    sexo: 'Masculino' | 'Feminino' | 'Outro';
    data_nascimento: string;
    created_at: string;
    updated_at: string;
    registos_cirurgicos_count?: number;
    registos_cirurgicos?: RegistoCirurgico[];
    user?: {
        id: number;
        name: string;
    };
}

export interface RegistoCirurgico {
    id: number;
    utente_id: number;
    hospital?: string;
    especialidade?: string;
    data_cirurgia: string;
    tipo_de_cirurgia_id: number;
    tipo_de_origem_id?: number;
    asa_score?: number;
    cirurgia_urgente?: boolean;
    tipo_de_abordagem: string;
    ambulatorio: boolean;
    observacoes?: string;
    created_at: string;
    updated_at: string;
    utente?: Utente;
    cirurgias?: Cirurgia[];
    cirurgias_count?: number;
    tipo_de_cirurgia?: TipoDeCirurgia;
    tipo_de_origem?: TipoDeOrigem;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface Cirurgia {
    id: number;
    registo_cirurgico_id: number;
    diagnostico_id: number;
    procedimento_id: number;
    funcao: 'Cirurgião Principal' | 'Cirurgião Assistente' | 'Residente' | 'Interno';
    funcao_cirurgiao?: string;
    duracao_minutos?: number;
    clavien_dindo?: 'I' | 'II' | 'IIIa' | 'IIIb' | 'IVa' | 'IVb' | 'V';
    tipo?: string;
    anatomia_patologica?: string;
    observacoes?: string;
    created_at: string;
    updated_at: string;
    diagnostico?: Diagnostico;
    procedimento?: Procedimento;
}

export interface Diagnostico {
    id: number;
    nome: string;
    zona_anatomica: string;
    tipo?: string;
    descricao?: string;
    created_at: string;
    updated_at: string;
}

export interface Procedimento {
    id: number;
    nome: string;
    especialidade: string;
    descricao?: string;
    created_at: string;
    updated_at: string;
}

export interface Especialidade {
    id: number;
    nome: string;
    created_at: string;
    updated_at: string;
    diagnosticos_count?: number;
    procedimentos_count?: number;
}

export interface ZonaAnatomica {
    id: number;
    nome: string;
    descricao?: string;
    created_at: string;
    updated_at: string;
}

export interface TipoDeCirurgia {
    id: number;
    nome: string;
    created_at: string;
    updated_at: string;
}

export interface TipoDeOrigem {
    id: number;
    nome: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
