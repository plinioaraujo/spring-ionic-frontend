export  const API_CONFIG = {
    base_url: 'http://localhost:8085',
    _bucketBaseUrl: 'https://s3-sa-east-1.amazonaws.com/spring-ionic-pa',
    get bucketBaseUrl() {
        return this._bucketBaseUrl;
    },
    
}