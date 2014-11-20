from django.conf.urls import include, url

urlpatterns = [
    url('', include('api.authentication.urls')),
]
