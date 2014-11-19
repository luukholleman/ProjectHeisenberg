from django.conf.urls import include, url
from rest_framework import routers
from authentication.views import UserViewSet, AuthenticatedUser

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'get-authenticated-user', AuthenticatedUser.as_view()),
    url(r'^', include(router.urls)),
    url(r'^login', 'authentication.views.obtain_auth_token'),
]
