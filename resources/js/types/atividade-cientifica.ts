export interface AtividadeCientifica {
    id: number;
    user_id: number;
    titulo: string;
    descricao?: string;
    tipo: string;
    data: string;
    revista_conferencia?: string;
    localizacao?: string;
    categoria?: string;
    autores?: string;
    autor_principal: boolean;
    posicao_autor?: number;
    doi?: string;
    isbn?: string;
    link?: string;
    fator_impacto?: number;
    ficheiro_path?: string;
    ficheiro_original_name?: string;
    ficheiro_size?: number;
    ficheiro_size_formatado?: string;
    observacoes?: string;
    created_at: string;
    updated_at: string;
    data_formatada: string;
}
