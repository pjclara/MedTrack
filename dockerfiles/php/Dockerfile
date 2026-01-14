FROM php:8.2-apache

RUN apk add --no-cache \
    icu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl

# Limpar diretórios temporários (opcional)
RUN rm -rf /tmp/*

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libzip-dev \
    zlib-dev

# Install PHP extensions
RUN docker-php-ext-install gd \
    && docker-php-ext-install zip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install node and npm
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /var/www

RUN docker-php-ext-install mysqli pdo pdo_mysql

EXPOSE 9000