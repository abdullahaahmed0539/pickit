import ProductForm from "../Components/ProductForm"

const CreateProduct = () => {
    return <>
        <ProductForm
            productName= ''
            price= ''
            imageLink={[]}
            description=''
            type='sell'
            categoryName='sports'
            categoryId='617301e3d53945aab87a00de' />
    </>
}
export default CreateProduct