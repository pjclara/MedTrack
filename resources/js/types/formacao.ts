export interface Formacao {
    id: number;
    user_id: number;
    titulo: string;
    descricao?: string;
    tipo: string;
    data_inicio: string;
    data_fim?: string;
    duracao_horas?: number;
    entidade_organizadora?: string;
    localizacao?: string;
    categoria?: string;
    tipo_participacao?: string;
    tema_apresentacao?: string;
    certificado_path?: string;
    certificado_original_name?: string;
    certificado_size?: number;
    creditos?: number;
    observacoes?: string;
    created_at: string;
    updated_at: string;
    
    // Computed attributes
    data_inicio_formatada: string;
    data_fim_formatada?: string;
    periodo_formatado: string;
    certificado_size_formatado?: string;
}

export interface FormacaoPaginatedData {
    data: Formacao[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}
