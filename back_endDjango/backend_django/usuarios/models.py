from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

# Create your models here.

#Todooooooooo
       

class  Todo(models.Model):
        title = models.CharField(max_length=200)
        done = models.BooleanField(default=False)
