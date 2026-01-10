export interface Utente {
    id: number;
    nome: string;
    processo: number;
    sexo: 'Masculino' | 'Feminino' | 'Outro';
    data_nascimento: string;
    created_at: string;
    updated_at: string;
    registo_cirurgicos_count?: number;
}

export interface RegistoCirurgico {
    id: number;
    utente_id: number;
    hospital?: string;
    area_cirurgica?: string;
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
    tipo_de_cirurgia?: TipoDeCirurgia;
    tipo_de_origem?: TipoDeOrigem;
}

export interface Cirurgia {
    id: number;
    registo_cirurgico_id: number;
    diagnostico_id: number;
    procedimento_id: number;
    funcao: 'Cirurgião Principal' | 'Cirurgião Assistente' | 'Residente' | 'Interno';
    clavien_dindo?: 'I' | 'II' | 'IIIa' | 'IIIb' | 'IVa' | 'IVb' | 'V';
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
    area: string;
    descricao?: string;
    created_at: string;
    updated_at: string;
}

export interface Procedimento {
    id: number;
    nome: string;
    area: string;
    descricao?: string;
    created_at: string;
    updated_at: string;
}

export interface Area {
    id: number;
    nome: string;
    created_at: string;
    updated_at: string;
    diagnosticos_count?: number;
    procedimentos_count?: number;
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
