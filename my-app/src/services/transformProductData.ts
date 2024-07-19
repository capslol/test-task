import { ProductType } from '../types/types';

const transformProductData = (data: any): ProductType => {
    return {
        id: data.id,
        ...data.attributes,
        image: data.attributes.image?.data?.attributes?.url
            ? `http://localhost:1337${data.attributes.image.data.attributes.url}`
            : null,
    };
};

export default transformProductData;
