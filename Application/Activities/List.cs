using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<PagedLists<ActivityDto>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedLists<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedLists<ActivityDto>>> Handle(
                Query request,
                CancellationToken token
            )
            {
                var query = _context.Activities
                    .Where(d => d.Date >= request.Params.StartDate)
                    .OrderBy(d => d.Date)
                    .ProjectTo<ActivityDto>(
                        _mapper.ConfigurationProvider,
                        new { currentUsername = _userAccessor.GetUsername() }
                    )
                    .AsQueryable();

                if (request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(
                        x => x.Attendees.Any(a => a.Username == _userAccessor.GetUsername())
                    );
                }

                if (request.Params.IsHost && !request.Params.IsGoing)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                }

                return Result<PagedLists<ActivityDto>>.Success(
                    await PagedLists<ActivityDto>.CreateAsync(
                        query,
                        request.Params.PageNumber,
                        request.Params.PageSize
                    )
                );
            }
        }
    }
}
