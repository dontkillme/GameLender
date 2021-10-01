"""dejgre2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from magazine.urls import urlpatterns as magazine_urls
from lend_app.urls import urlpatterns as lend_app_urls
from generic.urls import urlpatterns as generic_urls
from rest_framework.authtoken.views import ObtainAuthToken


class MyAuth(ObtainAuthToken):
    authentication_classes = []


urlpatterns = [
    path('auth/', MyAuth.as_view()),
    path('admin/', admin.site.urls),
    path('magazine/', include(magazine_urls)),
    path('lend/', include(lend_app_urls)),
    path('', include(generic_urls)),
]
