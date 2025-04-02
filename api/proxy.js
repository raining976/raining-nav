
export default async function GET(req) {
    let prefix = "/hitokoto-api"
    if (!req.url.startsWith(prefix)) {
        return;
    }
    // let target = "https://v1.hitokoto.cn"+ req.url.substring(prefix.length);

    const res = await fetch(target);
    console.log('res',res)
    const products = await res.json();
    console.log('products',products)
    return Response.json(products)
}