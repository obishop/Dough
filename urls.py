from django.conf.urls.defaults import *
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^dough/', include('dough.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),

    (r'^login/$', 'django.contrib.auth.views.login', {'template_name':'login.html'}),
    (r'^logout/$', 'django.contrib.auth.views.logout_then_login'),

    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.STATIC_ROOT}),

    (r'^food/', 'dough.doughapp.views.food'),
    (r'^budget/', 'dough.doughapp.views.budget'),
    (r'^recipes/', 'dough.doughapp.views.recipes'),
    (r'/$', 'dough.doughapp.views.index'),

)
