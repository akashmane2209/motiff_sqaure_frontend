import ApiService from './api.service';
import URLS from './url.service';

const ImageUploaderService = {
  uploadImage(formData) {
    let axiosOption = Object.assign({}, { data: formData });
    return ApiService.post(URLS.IMAGE_UPLOAD_URL(), axiosOption);
  }
};

export default ImageUploaderService;
