const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
const api_key = process.env.NEXT_PUBLIC_API_KEY as string;
const public_domain = process.env.NEXT_PUBLIC_DOMAIN as string;

export const API_REQUEST = {
    trending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-us`,
    top_rated: `${base_url}/movie/top_rated?api_key=${api_key}&language=en-us`,
    animation: `${base_url}/discover/movie?api_key=${api_key}&language=en-us&with_genres=16`,
    products_list: `${public_domain}/api/products`,
    subscription: `${public_domain}/api/subscription`
}