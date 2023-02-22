Abstract Factory
================

Definition
----------

The essence of the [Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory) Pattern is to "Provide an interface for creating families of related or dependent objects without specifying their concrete classes".

In Depth
--------

This pattern is highly useful when integrating separate systems. On one side, there is a framework that is providing significant value by solving the most common aspects of a problem. On the other side is the framework consumer who wants to build on the framework to fulfill specific use cases. Since the framework can't fully imagine all possible use cases, the framework plans for this ability to extend through abstraction. One such abstraction is an Abstract Factory.

In this particular pattern, the framework does not have to be burdened with how many specific instances of a particular concrete type are created, it simply abstracts the creation of those concrete types into an interface that the framework consumer can them implement. The end result is framework consumer can fulfill his specific use cases surrounding object/instance creation in his own way, while leveraging the wholesale value added by the framework.

Scenario
--------

From the Framework side perspective:

You want to build a shopping cart framework, but you don't want to create concrete product model and shipping method objects because you want your consumers to provide both the factory for product & shipping method model objects as well as those specific product and shipping method objects.

From the consumer side perspective:

You want to be able to build your product and shipping method object model without having to extend a base model provided by a shopping cart system. Ideally, you can develop your own product object model and simply introduce a mechanism into the shopping cart framework that can then consume these product objects.
