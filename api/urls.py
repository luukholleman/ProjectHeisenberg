from django.conf.urls import include, url
from api.views import APIRoot

urlpatterns = [
    url(r'overview', APIRoot.as_view(), name='api.root'),
    url('', include('api.authentication.urls')),
]
