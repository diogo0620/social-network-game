using System.Threading.Tasks;

namespace MDR.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}