import { getProducts } from "@/lib/supabase/api"
import { createClient } from "@/lib/supabase/server_config";


export default async function TestPage() {
    const {data: products} = await getProducts(); 
    return (
        <ul>
            {products?.map((product) => (
                <li>{product.product_name} {product.quantity}</li>
            ))}
        </ul>
    )
}
