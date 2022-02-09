import {
  DEngineClient,
  DVault,
  DWorkspaceV2,
  WorkspaceSettings,
  WorkspaceType,
} from "@dendronhq/common-all";
import { IWorkspaceService, WorkspaceService } from "@dendronhq/engine-server";
import { Disposable, ExtensionContext, FileSystemWatcher } from "vscode";
import { ICommandFactory } from "../commandFactoryInterface";
import { ILookupControllerV3Factory } from "../components/lookup/LookupControllerV3Interface";
import {
  INoteLookupProviderFactory,
  ISchemaLookupProviderFactory,
} from "../components/lookup/LookupProviderV3Interface";
import { IDendronExtension } from "../dendronExtensionInterface";
import { IEngineAPIService } from "../services/EngineAPIServiceInterface";
import { INoteSyncService } from "../services/NoteSyncService";
import { ISchemaSyncService } from "../services/SchemaSyncServiceInterface";
import { WSUtilsV2 } from "../WSUtilsV2";
import { IWSUtilsV2 } from "../WSUtilsV2Interface";

/**
 * Mock version of IDendronExtension for testing purposes. If you require additional
 * functionality for your tests, either add it here, or extend this class for
 * your own testing scenario
 */
export class MockDendronExtension implements IDendronExtension {
  private _engine: DEngineClient | undefined;
  private _context: ExtensionContext | undefined;
  private _wsRoot: string | undefined;
  private _vaults: DVault[] | undefined;

  constructor({
    engine,
    wsRoot,
    context,
    vaults,
  }: {
    engine?: DEngineClient;
    wsRoot?: string;
    context?: ExtensionContext;
    vaults?: DVault[];
  }) {
    this._engine = engine;
    this._context = context;
    this._wsRoot = wsRoot;
    this._vaults = vaults;
  }

  port?: number | undefined;
  get context(): ExtensionContext {
    if (!this._context) {
      throw new Error("Context not initialized in MockDendronExtension");
    }
    return this._context;
  }

  serverWatcher?: FileSystemWatcher | undefined;

  get type(): WorkspaceType {
    throw new Error("Method not implemented in MockDendronExtension");
  }
  get wsUtils(): IWSUtilsV2 {
    return new WSUtilsV2(this);
  }
  get commandFactory(): ICommandFactory {
    throw new Error("Method not implemented in MockDendronExtension");
  }
  get schemaSyncService(): ISchemaSyncService {
    throw new Error("Method not implemented in MockDendronExtension");
  }
  get workspaceService(): IWorkspaceService | undefined {
    if (!this._wsRoot) {
      throw new Error("WSRoot not initialized in MockDendronExtension");
    }
    return new WorkspaceService({
      wsRoot: this._wsRoot,
    });
  }
  get noteSyncService(): INoteSyncService {
    throw new Error("Method not implemented in MockDendronExtension");
  }
  get lookupControllerFactory(): ILookupControllerV3Factory {
    throw new Error("Method not implemented in MockDendronExtension");
  }
  get noteLookupProviderFactory(): INoteLookupProviderFactory {
    throw new Error("Method not implemented in MockDendronExtension");
  }

  get schemaLookupProviderFactory(): ISchemaLookupProviderFactory {
    throw new Error("Method not implemented in MockDendronExtension.");
  }

  /**
   * Note: No-Op
   * @param _cb
   * @returns
   */
  pauseWatchers<T = void>(cb: () => Promise<T>): Promise<T> {
    return cb();
  }

  getClientAPIRootUrl(): Promise<string> {
    throw new Error("Method not implemented in MockDendronExtension.");
  }
  getDWorkspace(): DWorkspaceV2 {
    const ret: any = {
      wsRoot: this._wsRoot,
      vaults: this._vaults,
    };

    return ret;
  }
  getWorkspaceImplOrThrow(): DWorkspaceV2 {
    throw new Error("Method not implemented in MockDendronExtension.");
  }
  getWorkspaceSettings(): Promise<WorkspaceSettings | undefined> {
    throw new Error("Method not implemented in MockDendronExtension.");
  }
  getWorkspaceSettingsSync(): WorkspaceSettings | undefined {
    throw new Error("Method not implemented in MockDendronExtension.");
  }
  getDendronWorkspaceSettingsSync():
    | Partial<{
        "dendron.dailyJournalDomain": string;
        "dendron.defaultJournalName": string;
        "dendron.defaultJournalDateFormat": string;
        "dendron.defaultJournalAddBehavior": string;
        "dendron.defaultScratchName": string;
        "dendron.defaultScratchDateFormat": string;
        "dendron.defaultScratchAddBehavior": string;
        "dendron.copyNoteUrlRoot": string;
        "dendron.linkSelectAutoTitleBehavior": string;
        "dendron.defaultLookupCreateBehavior": string;
        "dendron.defaultTimestampDecorationFormat": string;
        "dendron.rootDir": string;
        "dendron.dendronDir": string;
        "dendron.logLevel": string;
        "dendron.trace.server": string;
        "dendron.serverPort": string;
      }>
    | undefined {
    throw new Error("Method not implemented in MockDendronExtension.");
  }
  getWorkspaceSettingOrDefault() {
    throw new Error("Method not implemented in MockDendronExtension.");
  }
  setupViews(_context: ExtensionContext): Promise<void> {
    throw new Error("Method not implemented in MockDendronExtension.");
  }
  addDisposable(_disposable: Disposable): void {
    this._context?.subscriptions.push(_disposable);
  }

  /**
   * Note: trustedWorkspace is omitted
   * @returns
   */
  getEngine(): IEngineAPIService {
    if (!this._engine) {
      throw new Error("Engine not initialized in MockDendronExtension");
    }
    return this._engine as IEngineAPIService;
  }
}