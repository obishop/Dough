from django.db import models
from django.contrib.auth.models import User 

# Create your models here.
class FoodItem(models.Model):
    name = models.CharField(max_length=64)
    expiration = models.DateField()
    location = models.IntegerField()
    category = models.CharField(max_length=64)
    purchase = models.ForeignKey('Purchase')
    user = models.ForeignKey(User)

class Purchase(models.Model):
    amount = models.FloatField()
    date = models.DateField()
    user = models.ForeignKey(User)
