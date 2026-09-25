FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
ARG VITE_SUPABASE_URL=https://ctulkkvfodbipaxlisye.supabase.co
ARG VITE_SUPABASE_ANON_KEY=sb_publishable_3yH7mxY8CAPAt0rjvQEmTg_nzpX_rV9
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
