from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'ProjectHeisenberg.views.base', name='base'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^admin', include(admin.site.urls)),
                       url(r'^api/v1(/?)$', 'api.views.api_root', name='api.v1.root'),
                       url(r'^api/v1/', include('api.urls')),
                       url(r'^', include('base.urls')),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
