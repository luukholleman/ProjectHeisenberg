from django.conf.urls import include, url
from rest_framework import routers
from api.authentication.views import UserViewSet, AuthenticatedUser, ActivateUser

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'users', UserViewSet, base_name='api.v1.user')
# router.register(r'login', 'api.authentication.views.obtain_auth_token')

urlpatterns = [
    url('activate', ActivateUser.as_view()),
    url('get-authenticated-user$', AuthenticatedUser.as_view(), name='api.v1.get-authenticated-user'),
    url('login$', 'api.authentication.views.obtain_auth_token', name='api.v1.login'),
    url('', include(router.urls)),
]
