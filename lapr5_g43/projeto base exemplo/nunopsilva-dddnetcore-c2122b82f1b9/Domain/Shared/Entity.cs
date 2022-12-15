namespace DDDNetCore.Domain.Shared
{
    /// <summary>
    /// Base class for entities.
    /// </summary>
    public abstract class Entity<TEntityId>
    {
         public TEntityId Id { get;  protected set; }
    }
}