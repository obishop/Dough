from django.db import models

# Create your models here.
class FoodItem(models.Model):
    name = models.CharField(max_length=64)
    expiration = models.DateField()
    location = models.IntegerField()
    category = models.CharField(max_length=64)
    purchase = models.ForeignKey('Purchase')

class Purchase(models.Model):
    amount = models.FloatField()
    date = models.DateField()
