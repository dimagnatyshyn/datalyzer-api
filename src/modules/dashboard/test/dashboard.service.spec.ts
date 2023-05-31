import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../dashboard.service';
import { DashboardRepositoryService } from '../dashboard-repository.service';
import { searchQuery } from '../../../base/utils';

describe('DashboardService', () => {
  let service: DashboardService;
  const dashboardRepositoryServiceMock = {
    update: jest.fn(),
    createDashboard: jest.fn(),
    delete: jest.fn(),
    getPaginatedList: jest.fn(),
    findById: jest.fn(),
  };
  const mockDashboardId = 1;
  const mockUser = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DashboardRepositoryService, useValue: dashboardRepositoryServiceMock },
        DashboardService,
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDashboard', () => {
    it('should create dashboard', async () => {
      const name = 'name';
      await service.createDashboard({ name }, mockUser);
      expect(dashboardRepositoryServiceMock.createDashboard).toBeCalledWith(name, mockUser);
    });
  });

  describe('deleteDashboard', () => {
    it('should delete dashboard', async () => {
      const expectedArgument = { id: mockDashboardId, user_id: mockUser };
      await service.deleteDashboard(mockDashboardId, mockUser);
      expect(dashboardRepositoryServiceMock.delete).toBeCalledWith(expectedArgument);
    });
  });

  describe('changeDashboardName', () => {
    it('should change dashboard name', async () => {
      const name = 'name';
      const matcher = { id: mockDashboardId, user_id: mockUser };
      await service.changeDashboardName(mockDashboardId, name, mockUser);
      expect(dashboardRepositoryServiceMock.update).toBeCalledWith(matcher, { name });
      expect(dashboardRepositoryServiceMock.findById).toBeCalledWith(mockDashboardId);
    });
  });

  describe('getDashboards', () => {
    it('should get dashboards', async () => {
      const page = 4;
      const itemsPerPage = 10;
      const search = 'name';
      const expectedArgument = {
        skip: 30,
        itemsPerPage,
        matcher: { user_id: mockUser, name: searchQuery(search) },
      };
      await service.getDashboards(page, itemsPerPage, search, mockUser);
      expect(dashboardRepositoryServiceMock.getPaginatedList).toBeCalledWith(expectedArgument);
    });
  });
});
