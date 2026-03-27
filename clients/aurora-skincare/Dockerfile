FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mysqli bcmath mbstring exif gd zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

RUN { \
    echo "memory_limit=-1"; \
    echo "max_execution_time=0"; \
    echo "upload_max_filesize=128M"; \
    echo "post_max_size=128M"; \
} > /usr/local/etc/php/conf.d/99-custom.ini

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . /var/www/html
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf

RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

RUN mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs \
    && mkdir -p public/uploads/all \
    && touch .env \
    && chown -R www-data:www-data storage bootstrap/cache public/uploads .env app/Providers/RouteServiceProvider.php \
    && chmod -R ug+rwX public/uploads storage bootstrap/cache \
    && chmod 664 .env app/Providers/RouteServiceProvider.php

EXPOSE 80
